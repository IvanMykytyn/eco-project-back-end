const task = require('../models/task')
const user = require('../models/user')
const activity = require('../models/activity')

const { findUserByEmail } = require('../services/userService')

const { sendResponse } = require('../helpers/sendResponse')

function getFavorite(arr) {
  if (arr.length === 1) {
    return arr[0]
  }
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop()
}

module.exports = {
  async ratingController(req, res) {
    try {
      const { category, amount, page, sortBy } = req.query

      const tasks = await task.find({})
      let users = await user.find({})
      const activities = await activity.find({})

      // all users
      users.forEach((currentUser) => {
        // initial state
        currentUser.points = 0
        currentUser.count_of_tasks = 0
        var categoryArray = []

        // check tasks that user did
        tasks.forEach((currentTask) => {
          if (currentTask.user_id.toString() == currentUser._id.toString()) {
            // check how many points it cost
            const taskActivity = activities.find(
              (currentActivity) =>
                currentActivity.title == currentTask.activity_type
            )

            // add points, count of tasks, and category
            currentUser.points +=
              taskActivity.number_of_points * currentTask.numerical_indicators
            currentUser.count_of_tasks += 1
            categoryArray.push(taskActivity.title)
          }
        })

        //set user full name
        currentUser.full_name =
          currentUser.first_name[0].toUpperCase() +
          '. ' +
          currentUser.last_name[0].toUpperCase() +
          currentUser.last_name.slice(1).toLowerCase()
        //

        // set user favorite category
        const favoriteCategory = getFavorite(categoryArray)
        if (category && category === 'any') {
          currentUser.favorite = favoriteCategory
        } else if (category && favoriteCategory === category) {
          currentUser.favorite = favoriteCategory
        } else if (category && favoriteCategory !== category) {
          currentUser.favorite = undefined
        } else {
          currentUser.favorite = favoriteCategory
        }
      })

      let userRating = users
        .filter((user) => user.favorite)
        .map((user) => {
          return {
            _id: user._id,
            full_name: user.full_name,
            points: user.points,
            count_of_tasks: user.count_of_tasks,
            favorite: user.favorite,
          }
        })

      // sort depend on sortBy
      if (sortBy && sortBy === 'count_of_tasks') {
        userRating = userRating.sort(
          (a, b) => b.count_of_tasks - a.count_of_tasks
        )
      } else if (sortBy && sortBy === 'points') {
        userRating = userRating.sort((a, b) => b.points - a.points)
      } else {
        userRating = userRating.sort((a, b) => b.points - a.points)
      }

      // set rating positions
      userRating = userRating.map((currentUser, index) => {
        currentUser.place = index + 1
        return currentUser
      })

      const totalTasks = userRating.length

      const parsedPage = parseInt(page)
      const parsedAmount = parseInt(amount)

      //.slice(index, limit + index)
      userRating = userRating.slice(
        (parsedPage - 1) * parsedAmount,
        (parsedPage - 1) * parsedAmount + parsedAmount
      )

      res.status(200).send({ userRating, totalTasks })
      res.end()
    } catch (e) {
      sendResponse(res, 500, e.message)
    }
  },
}
