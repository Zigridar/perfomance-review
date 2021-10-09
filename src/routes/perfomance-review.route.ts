import express, { Router } from "express";
import auth from "../middleware/auth.middleware";
import { IPerfomanceReviewMessage, IPerfomanceReviewsMessage } from "../common_types/API";
import { check, validationResult } from "express-validator";
import { ParamsDictionary } from "express-serve-static-core";
import { Nullable } from "../common_types/TypeUtils";
import PerfomanceReview, { DocumentPerfomanceReview, toIPerfomanceReviewWithId } from "../db/models/PerfomanceReview";
import { IPerfomanceReview, IPerfomanceReviewWithId } from "../common_types/interfaces/PerfomanceReview";
import User from "../db/models/User";

type QueryPerfomanceReview = {
    employeeId?: string
}

const perfomanveReviewRouter = (jwtSecret: string) => {

    const router = Router();

    /** get all perfomance reviews */
    router.get(
        '/',
        [
            auth(jwtSecret)
        ],
        async (req: express.Request<any, any, any, QueryPerfomanceReview>, res: express.Response) => {
            try {
                const emplId = req.query.employeeId

                if (emplId) {
                    const empl = await User.findById(emplId)

                    if (empl) {
                        const perfomanceReviews: DocumentPerfomanceReview[] = await PerfomanceReview.find({ employee: empl }).sort({ name: 1 });

                        const perfomanceReviewsToClient: IPerfomanceReviewWithId[] = perfomanceReviews.map(toIPerfomanceReviewWithId);

                        const responseMessage: IPerfomanceReviewsMessage = {
                            perfomanceReviews: perfomanceReviewsToClient
                        }

                        await res.json(responseMessage);

                    } else {
                        const responseMessage: IPerfomanceReviewsMessage = {
                            perfomanceReviews: []
                        }

                        await res.json(responseMessage);
                    }
                } else {
                    const perfomanceReviews: DocumentPerfomanceReview[] = await PerfomanceReview.find().sort({ name: 1 });

                    const perfomanceReviewsToClient: IPerfomanceReviewWithId[] = perfomanceReviews.map(toIPerfomanceReviewWithId);

                    const responseMessage: IPerfomanceReviewsMessage = {
                        perfomanceReviews: perfomanceReviewsToClient
                    }

                    await res.json(responseMessage);
                }
            } catch (e) {
                await res.status(500).json({ message: 'something failed!' })
                console.error(e);
            }
        }
    )

    /** create perfomance review */
    router.put(
        '/',
        [
            auth(jwtSecret),
            check('name', 'name is empty').exists().notEmpty(),
            check('dateOfOneToOne', 'dateOfOneToOne is empty').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IPerfomanceReview>, res: express.Response) => {
            try {
                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { name, author, employee, events, dateOfOneToOne, result } = req.body;

                const pr = new PerfomanceReview();
                pr.name = name
                pr.author = author
                pr.employee = employee
                pr.events = events
                pr.dateOfOneToOne = dateOfOneToOne
                pr.result = result
                await pr.save();

                const responseMessage: IPerfomanceReviewMessage = {
                    perfomanceReview: toIPerfomanceReviewWithId(pr)
                }

                await res.json(responseMessage);

            } catch (e: any) {
                console.error(e);
                await res.status(500).json({ error: `can\`t save perfomance review, ${e.message}` });
            }
        }
    );

    /** edit perfomance review */
    router.post(
        '/',
        [
            auth(jwtSecret),
            check('id', 'id is empty').exists().notEmpty(),
            check('name', 'name is empty').exists().notEmpty(),
            check('dateOfOneToOne', 'dateOfOneToOne is empty').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IPerfomanceReviewWithId>, res: express.Response) => {
            try {

                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { id: _id, name, author, employee, events, dateOfOneToOne, result } = req.body;

                const pr: Nullable<DocumentPerfomanceReview> = await PerfomanceReview.findOne({ _id });

                if (pr) {
                    pr.name = name
                    pr.author = author
                    pr.employee = employee
                    pr.events = events
                    pr.dateOfOneToOne = dateOfOneToOne
                    pr.result = result

                    await pr.save();

                    const responseMessage: IPerfomanceReviewMessage = {
                        perfomanceReview: toIPerfomanceReviewWithId(pr)
                    }

                    await res.json(responseMessage);
                } else {
                    await res.status(400).json({ message: 'perfomance review not found' });
                }

            } catch (e: any) {
                await res.status(500).json({ error: `can\`t update perfomance review, ${e.message}` });
            }
        }
    );

    /** delete perfomance review */
    router.delete(
        '/',
        [
            auth(jwtSecret),
            check('id').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IPerfomanceReviewWithId>, res: express.Response) => {
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

                const pr: Nullable<DocumentPerfomanceReview> = await PerfomanceReview.findOne({ _id });

                if (pr) {
                    const responseMessage: IPerfomanceReviewMessage = {
                        perfomanceReview: toIPerfomanceReviewWithId(pr)
                    }
                    await pr.delete();
                    await res.json(responseMessage);
                }
                else {
                    await res.status(400).json({ error: 'perfomance review not found' });
                }

            }
            catch (e: any) {
                await res.status(500).json({ error: `can\` delete perfomance review, ${e.message}` });
            }
        }
    );

    return router;
}

export default perfomanveReviewRouter;