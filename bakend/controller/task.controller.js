import { errorHandler } from "../utils/error.js"
import Task from "../models/task.model.js"


// create a task 
export const createTask = async (req, res, next ) => {
   try {
    const {title, description, priority,
         dueDate, assignedTo, attachments,
          todoChecklist} = req.body

      
    if(!Array.isArray(assignedTo)){
        return next(errorHandler(400, "assignedTo must be an array of user IDs"))
    }

    const task = await Task.create({
        title,
        description,
        priority,
        dueDate, 
        assignedTo,
        attachments,
     todoChecklist,
     createdBy: req.user.id,

    })

    res.status(201).json({message: "Task created successfully", task})

   } catch (error) {
    next(error)
   }
}


//get Task get all task the data 
export const getTask = async (req, res, next) => {
   try {
    const { status } = req.query
    // console.log(`this is status ${status}`)
    // console.log(`this is req.body = ${req.query}`)

    let filter = {}

    if (status) {
        filter.status = status
    }

    let tasks

    if(req.user.role === "admin"){
        tasks = await Task.find(filter).populate("assignedTo", "name email profileImageUrl")
    } else {
        tasks =  await Task.find({
            ...filter,
            assignedTo: req.user.id,
        }).populate("assignedTo", "name email profileImageUrl")
    }

    tasks = await Promise.all(
        tasks.map(async (task) => {
            const completedCount = task.todoChecklist.filter(
             (item) => item.completed
            ).length
            
           return {...task._doc, completedCount: completedCount}

        })
    )


    //status summary count 

    const allTasks =  await Task.countDocuments(
        req.user.role === "admin"  ? {} : {assigendTo: req.user.id}
    )

    const pandingTasks = await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.user.role !== "admin" && {assignedTo: req.user.id}),

    })

     const inProgressTask =  await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && {assigendTo: req.user.id}),
     })

     const completedTask = await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.user.role !== "admin" && {assignedTo: req.user.id})

     })

     res.status(200).json({
        tasks,
        statusSummary: {
            all: allTasks,
            pandingTasks ,
            inProgressTask,
            completedTask
        }
     })

   } catch (error) {
    next(error)
   }   
}

export const  getTaskById = async (req, res, next) => {
    try{
      const task = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl"
      )

      if(!task) {
        return next(errorHandler(404, "Task not found!"))
      }
    
      res.status(200).json(task)


    } catch(error) {
       next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try{
        const task = await Task.findById(req.params.id) 

        if(!task) {
            return next(errorHandler(404, "Task not found"))
        }

        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.priority = req.body.priority || task.priority
        task.dueDate = req.body.dueDate || task.dueDate
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist
        task.attachments = req.body.attachments || task.attachments

        if(req.body.assigendTo) {
            if (!Array.isArray(req.body.assigendTo)) {
                return next(
                    errorHandler(400, "assignedTo must be an array of user IDs")
                )
            }
            task.assignedTo = req.body.assignedTo
        }

       const updatedTask = await task.save()
          
       return res.status(200).json({updatedTask, message: "Task updated successfully!"})
    } catch(error) {
        next(error)
    }
} 

export const deleteTask = async(req, res, next) =>{
    try{
        const task = await Task.findById(req.params.id)
       
        if(!task) {
            return next(errorHandler(404, "Task not found"))
        }

        await task.deleteOne()

        res.status(200).json({message: "Task deleted successfully!"})

    } catch (error) {
        next(error)
    }
}

export const updateTaskStatus = async(req, res, next) =>{
    try{
      const task = await Task.findById(req.params.id)

      if(!task) {
        return next(errorHandler(404, "Task not found!"))
      }

     const isAssigned = task.assignedTo.some(
        (userId) => userId.toString() === req.user.id.toString()
     )

     if(isAssigned && req.user.role !== "admin") {
        return next(errorHandler(403, "Unauthorized"))
     }

     task.status = req.body.status || task.status

     if(task.status === "Completed") {
        task.todoChecklist.forEach((item) => (item.completed = true))
     }

    res.status(200).json({message: "Task status updated", task})

    } catch(error) {
        next(error)
    }
 }
/** 
export const  updateTaskChecklist = async(req, res, next) =>{
    try{
        const { todoChecklist } = req.body

        const task = await Task.findById(req.params.id)

        if(!task) {
            return next(errorHandler(404, "Task not found!"))
        }
        
        if(!task.assignedTo.includes(req.user.id) && req.user.role !== "admin"){
            return next(errorHandler(403, "Not authorized to update checklist"))
        }

        task.todoChecklist = todoChecklist

        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length

        const totalItems = task.todoChecklist.length

        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0

        if(task.progress === 100){
            task.status = "Completed"
        }else if(task.progress > 0) {
            task.status = "In Progress"
        }else if(
            task.status = "Pending"
        )

        await task.save()
        const updatedTask = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageUrl")

        res.status(200).json({message: "Task checklist updated", task: updatedTask})

    }catch (error){
        next(error)
    }
}

*/

export const updateTaskChecklist = async(req, res, next) =>{
    try{
        console.log("👉 API HIT")

        const { todoChecklist } = req.body
        console.log("👉 req.body:", req.body)

        const task = await Task.findById(req.params.id)
        console.log("👉 task from DB:", task)

        if(!task) {
            return next(errorHandler(404, "Task not found!"))
        }

        // 🔥 CHECK assignedTo
        console.log("👉 assignedTo:", task.assignedTo)
        console.log("👉 req.user.id:", req.user.id)

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user.id.toString()
        )

        console.log("👉 isAssigned:", isAssigned)

        if(!isAssigned && req.user.role !== "admin"){
            return next(errorHandler(403, "Not authorized"))
        }

        task.todoChecklist = todoChecklist
        console.log("👉 Updated checklist:", task.todoChecklist)

        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length

        const totalItems = task.todoChecklist.length

        console.log("👉 completedCount:", completedCount)
        console.log("👉 totalItems:", totalItems)

        task.progress = totalItems > 0 
            ? Math.round((completedCount / totalItems) * 100) 
            : 0

        console.log("👉 progress:", task.progress)

        // 🔴 YAHI BUG THA
        if(task.progress === 100){
            task.status = "Completed"
        } else if(task.progress > 0) {
            task.status = "In Progress"
        } else {
            task.status = "Pending"
        }

        console.log("👉 final status:", task.status)

        await task.save()
        console.log("✅ SAVED IN DB")

        const updatedTask = await Task.findById(req.params.id)

        res.status(200).json({
            message: "Task checklist updated",
            task: updatedTask
        })

    }catch (error){
        console.log("❌ ERROR:", error)
        next(error)
    }
}
