export const validateQuizObject = quiz => {
  const { isPublic, timeLimit, title, questions } = quiz;
  const errors = {};

  //validate public option
  if (typeof isPublic !== "boolean") {
    errors.isPublic = "Public option is not a valid data.";
  }

  //validate request body
  if (typeof title !== "string" || !title.trim()) {
    errors.title = "Quiz title must contain atleast 1 character.";
  }

  // time limit validation
  if (typeof timeLimit.limit !== "number" || timeLimit.limit < 0) {
    errors.timeLimit =
      "Time limit must be a number. Time limit must be greater than 0.";
  }

  // questions length validation
  if (!questions.length) {
    errors.questions = "Quiz must have atleast 1 question.";
  }

  // answers validation
  questions.forEach(({ answers, question, correct }) => {
    const trimmedAnswers = Object.values(answers).map(answer => answer.trim());
    const trimmedQuestion = question.trim();

    if (trimmedQuestion.length < 5) {
      errors.answers = "Question must have atleast 5 characters.";
      return;
    }

    if (typeof correct !== "number" || correct > 3) {
      errors.answers = "Correct answer is not a valid data.";
      return;
    }

    if (
      !trimmedAnswers[0] ||
      !trimmedAnswers[1] ||
      !trimmedAnswers[2] ||
      !trimmedAnswers[3]
    ) {
      errors.answers = "Answer must have atleast 1 character.";
      return;
    }
  });

  return errors;
};
