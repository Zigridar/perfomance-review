import express, { Router } from "express";
import auth from "../middleware/auth.middleware";
import { check, validationResult } from "express-validator";
import { ParamsDictionary } from "express-serve-static-core";
import { IForm, IFormWithId } from "../common_types/interfaces/Form";
import Form, { DocumentForm, toIFormWithId } from "../db/models/Form";
import { IFormMessage, IFormsMessage } from "../common_types/API";
import { Nullable } from "../common_types/TypeUtils";
import { ReviewType } from "../common_types/interfaces/Review";

type FormQuery = {
    type?: ReviewType
}

const formRouter: (jwtSecret: string) => Router = (jwtSecret: string) => {
    const router = Router();

    /** create form */
    router.put(
        '/',
        [
            auth(jwtSecret),
            check('description', 'incorrect description').exists().notEmpty(),
            check('type', 'incorrect type').exists().notEmpty(),
        ],
        async (req: express.Request<ParamsDictionary, any, IForm>, res: express.Response) => {
            try {

                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { description, type, questions, author } = req.body;

                const form = new Form();
                form.description = description;
                form.type = type;
                form.questions = questions;
                form.author = author;
                await form.save();

                const responseMessage: IFormMessage = {
                    form: toIFormWithId(form)
                }

                await res.json(responseMessage);
            }
            catch (e: any) {
                console.error(e);
                await res.status(500).json({ error: `can\`t save form, ${e.message}` });
            }
        }
    )

    /** get all forms */
    router.get(
        '/',
        [
            // auth(jwtSecret)
        ],
        async (req: express.Request<any, any, any, FormQuery>, res: express.Response) => {
            try {
                const formType = req.query.type

                if (formType) {

                    console.log("formType")
                    const forms: DocumentForm[] = await Form.find({ type: formType })

                    const formsToClient: IFormWithId[] = forms.map(toIFormWithId);

                    const responseMessage: IFormsMessage = {
                        forms: formsToClient
                    }

                    await res.json(responseMessage);
                } else {

                    console.log('all')
                    const forms: DocumentForm[] = await Form.find().sort({ name: 1 });

                    const formsToClient: IFormWithId[] = forms.map(toIFormWithId);

                    const responseMessage: IFormsMessage = {
                        forms: formsToClient
                    }

                    await res.json(responseMessage);
                }
            }
            catch (e) {
                await res.status(500).json({ message: 'something failed!' })
                console.error(e);
            }
        }
    )

    /** edit form */
    router.post(
        '/',
        [
            auth(jwtSecret),
            check('id', 'incorrect id').exists().notEmpty(),
            check('description', 'incorrect description').exists().notEmpty(),
            check('type', 'incorrect type').exists().notEmpty(),
        ],
        async (req: express.Request<ParamsDictionary, any, IFormWithId>, res: express.Response) => {
            try {

                const errors = validationResult(req.body);

                /** if it is empty continue */
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'incorrect data'
                    });
                }

                const { id: _id, description, type, questions, author, archived } = req.body;

                /** find form by id */
                const form: Nullable<DocumentForm> = await Form.findOne({ _id })

                if (form) {
                    form.description = description;
                    form.type = type;
                    form.questions = questions;
                    form.author = author;
                    form.archived = archived;
                    await form.save();

                    const responseMessage: IFormMessage = {
                        form: toIFormWithId(form)
                    }

                    await res.json(responseMessage);
                }
                else {
                    await res.status(400).json({ message: 'form not found' });
                }

            }
            catch (e: any) {
                await res.status(500).json({ error: `can\`t update form, ${e.message}` });
            }
        }
    );

    router.delete(
        '/',
        [
            auth(jwtSecret),
            check('id').exists().notEmpty()
        ],
        async (req: express.Request<ParamsDictionary, any, IFormWithId>, res: express.Response) => {
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

                const form: Nullable<DocumentForm> = await Form.findOne({ _id });

                if (form) {
                    const responseMessage: IFormMessage = {
                        form: toIFormWithId(form)
                    }
                    form.archived = true;
                    await res.json(responseMessage);
                }
                else {
                    await res.status(400).json({ error: 'form not found' });
                }
            }
            catch (e: any) {
                await res.status(500).json({ error: `can\`t delete form, ${e.message}` });
            }
        }
    );

    return router;
}

export default formRouter;