const { isValidObjectId } = require('mongoose')
const todoModel = require('../models/todoModel')

const createTodo = async (req, res) => {
    try {
        let { title, description, status } = req.body

        if (!title) return res.status(400).send({ status: false, message: 'title is required' })
        if (!status) return res.status(400).send({ status: false, message: 'status is required' })

        let uniqueTitle = await todoModel.findOne({ title })
        if (uniqueTitle) return res.status(400).send({ status: false, message: 'title already taken' })

        const createTodo = await todoModel.create({ title, description, status })

        res.status(201).send({ status: true, message: 'Succesfully created', data: createTodo })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getTodo = async (req, res) => {

    try {
        let allTodos = await todoModel.find({ isDeleted: false }).select({ _id: 0, createdAt: 0, updatedAt: 0, isDeleted: 0 })

        if (allTodos.length == 0) return res.status(404).send({ status: false, message: 'Todo list is empty' })

        res.status(201).send({ status: true, message: 'list of all todos', data: allTodos })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const updateTodo = async (req, res) => {

    try {
        let id = req.params.id;
        if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: 'enter valid id' })

        let findTodo = await todoModel.findOne({ _id: id, isDeleted: false })
        if (!findTodo) return res.status(404).send({ status: false, message: 'todo is deleted or does not exist' })

        let { title, description, status } = req.body;

        if (title) {
            let uniqueTitle = await todoModel.findOne({ title })
            if (uniqueTitle) return res.status(400).send({ status: false, message: 'title already taken' })
        }

        await todoModel.updateOne({ _id: id }, { title, description, status })

        res.status(204).send({ status: true, message: 'updated succesfully' })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteTodo = async (req, res) => {
    try {
        let id = req.params.id;
        if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: 'enter valid id' })

        let findTodo = await todoModel.findOne({ _id: id, isDeleted: false }).select({ _id: 0, createdAt: 0, updatedAt: 0, isDeleted: 0 })

        if (!findTodo) return res.status(404).send({ status: false, message: 'todo is deleted or does not exist' })

        await todoModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });

        res.status(204).send({ status: true, message: 'successfully deleted' })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createTodo, getTodo, updateTodo, deleteTodo }