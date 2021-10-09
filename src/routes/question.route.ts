import express, { Router } from "express";
import auth from "../middleware/auth.middleware";
import Question, { DocumentQuestion, toIQuestionWithId } from "../db/models/Question";
import { IQuestion, IQuestionWithId } from "../common_types/interfaces/Question";
import { IQuestionMessage, IQuestionsMessage, IUserMessage } from "../common_types/API";
import { check, validationResult } from "express-validator";
import { ParamsDictionary } from "express-serve-static-core";
import { Nullable } from "../common_types/TypeUtils";

const questionRouter = (jwtSecret: string) => {

    const router = Router();

    /** get all questions */
    router.get(
        '/',
        [
            auth(jwtSecret)
        ],
        async (req: express.Request, res: express.Response) => {
            try {
                const questions: DocumentQuestion[] = await Question.find().sort({ name: 1 });

                const questionToClient: IQuestionWithId[] = questions.map(toIQuestionWithId);

                const responseMessage: IQuestionsMessage = {
                    questions: questionToClient
                }

                await res.json(responseMessage);
            } catch (e) {
                await res.status(500).json({ message: 'something failed!' })
                console.error(e);
            }
        }
    )

    /** create question */
    router.put(
        '/',
        [
            auth(jwtSecret),
            check('text', 'text is empty').exists().notEmpty(),
            check('type', 'type is empty').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IQuestion>, res: express.Response) => {
            try {
                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { text, type, answers, variable, scored } = req.body;

                const question = new Question();
                question.text = text;
                question.type = type;
                question.answers = answers;
                question.variable = variable;
                question.scored = scored;
                await question.save();

                const responseMessage: IQuestionMessage = {
                    question: toIQuestionWithId(question)
                }

                await res.json(responseMessage);

            } catch (e: any) {
                console.error(e);
                await res.status(500).json({ error: `can\`t save user, ${e.message}` });
            }
        }
    );

    router.post(
        '/',
        [
            auth(jwtSecret),
            check('text', 'text is empty').exists().notEmpty(),
            check('type', 'type is empty').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IQuestionWithId>, res: express.Response) => {
            try {

                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { id: _id, text, type, answers, variable, scored } = req.body;

                const question: Nullable<DocumentQuestion> = await Question.findOne({ _id });

                if (question) {
                    question.text = text;
                    question.type = type;
                    question.answers = answers;
                    question.variable = variable;
                    question.scored = scored;

                    await question.save();

                    const responseMessage: IQuestionMessage = {
                        question: toIQuestionWithId(question)
                    }

                    await res.json(responseMessage);
                } else {
                    await res.status(400).json({ message: 'question not found' });
                }

            } catch (e: any) {
                await res.status(500).json({ error: `can\`t update question, ${e.message}` });
            }
        }
    );

    router.delete(
        '/',
        [
            auth(jwtSecret),
            check('id').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IQuestionWithId>, res: express.Response) => {
            try {
                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { id: _id } = req.body;

                const question: Nullable<DocumentQuestion> = await Question.findOne({ _id });

                if (question) {
                    const responseMessage: IQuestionMessage = {
                        question: toIQuestionWithId(question)
                    }
                    await question.delete();
                    await res.json(responseMessage);
                }
                else {
                    await res.status(400).json({ error: 'question not found' });
                }

            }
            catch (e: any) {
                await res.status(500).json({ error: `can\` delete question, ${e.message}` });
            }
        }
    );

    return router;
}

export default questionRouter;