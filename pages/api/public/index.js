import Quiz from "models/quiz";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let publicQuizList;
    try {
      publicQuizList = await Quiz.aggregate([
        { $match: { isPublic: true } },
        { $sample: { size: 10 } },
        { $project: { title: 1, stats: 1 } },
      ]);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again later" });
    }

    res.json({ message: "OK", content: publicQuizList });
  }
};

export default handler;
