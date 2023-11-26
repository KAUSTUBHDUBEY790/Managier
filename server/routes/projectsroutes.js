const router  = require("express").Router();
const authmiddleware = require("../middlewares/authmiddleware")
const Project = require("../modals/projectmodule")

const User = require("../modals/usermodule");

// create a project
router.post("/create-project", authmiddleware, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.send({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});


// edit a project
router.post("/edit-project", authmiddleware, async (req, res) => {
    try {
      await Project.findByIdAndUpdate(req.body._id, req.body);
      res.send({
        success: true,
        message: "Project updated successfully",
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  });
  // delete a project
router.post("/delete-project", authmiddleware, async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.body._id);
      res.send({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  });

// get projects by role
router.post("/get-all-project", authmiddleware, async (req, res) => {
    try {
      const userId = req.body.userId;
      const projects = await Project.find({ "members.user": userId })
        .sort({
          createdAt: -1,
        })
      res.send({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  });

// get project by id
router.post("/get-project-by-id", authmiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.body._id)
      .populate("owner")
      .populate("members.user");
    res.send({
      success: true,
      data: project,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});
module.exports = router;
