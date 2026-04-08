import User from "../models/user.model.js"
import Task from "../models/task.model.js"
import { errorHandler } from "../utils/error.js"

export const getUsers = async(req, res ,next) => {
    try{
      const users = await User.find({role: "user"}).select("-password")

      const userWithTaskCounts = await Promise.all(
        users.map(async (user) => {
          const PendingTask = await Task.countDocuments({
            assignedTo: user._id,
            status: "pending",
          })

         const inProgressTask = await Task.countDocuments({
            assignedTo: user._id,
            status: "In Progress",
         })

         const completedTasks = await Task.countDocuments({
            assignedTo: user._id,
            status: "Pending"
         })
         
         return {
            ...user._doc,
            PendingTask,
            inProgressTask,
            completedTasks,
         }

        })
      )

     res.status(200).json(userWithTaskCounts)

    } catch (error) {
        next(error)
    }
} 

export const getUsersById = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id).select("-password")

    if(!user){
      return next(errorHandler(404, "User not found"))
    }

    res.status(200).json(user)

  } catch(error) {
    next(error)
  }
}