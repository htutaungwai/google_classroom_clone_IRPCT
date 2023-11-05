import mongoose from "mongoose";
import manageResponses from "../../../../../../../utils/responses/manageResponses";
import db from "../../../../../../../utils/db";
import Assignment from "../../../../../../../models/Assignment";
import Class from "../../../../../../../models/Class";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({
      status: 400,
      message: "Bad Request!",
    });
  }

  try {
    const { assignmentId, classId } = req.query;
    const userId = req.headers["x-user-id"];
    var ObjectId = mongoose.Types.ObjectId;

    if (!ObjectId.isValid(assignmentId)) {
      const error = new Error("Invalid Id!");
      error.statusCode = 422;
      throw error;
    }

    await db.connect();

    const classData = await Class.findById(classId);

    if (classData?.teacher.toString() !== userId) {
      const error = new Error("Unauthorized!");
      error.statusCode = 401;
      throw error;
    }

    const submissions = await Assignment.findById(assignmentId)
      .select("-_id responses")
      .populate({
        path: "responses.user",
        select: {
          _id: 0,
          "credentials.name": 1,
          "credentials.userImage": 1,
        },
      });

    return res.status(200).json({
      submissions: submissions,
    });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    return res
      .status(error.statusCode)
      .json(manageResponses(error.statusCode, error.message));
  }
};

export default handler;
