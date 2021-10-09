import Form from "../db/models/Form"
import { CLOSED, OPEN } from "../common_types/interfaces/Question"
import Question from "../db/models/Question"
import { ATTESTATION, IEvent } from "../common_types/interfaces/Review"
import User, { toIUserWithId } from "../db/models/User"
import PerfomanceReview from "../db/models/PerfomanceReview"

const mockQuestions = async () => {
    const q1 = new Question();
    q1.text = "вопрос 1";
    q1.type = CLOSED;
    q1.answers = [{
        text: "a chto esli",
        isCorrect: false
    },
    {
        text: "dva vse ponyatno",
        isCorrect: true
    }];

    const q2 = new Question();
    q2.text = "vopros 2";
    q2.type = OPEN;

    const q3 = new Question();
    q3.text = "question three";
    q3.type = CLOSED;
    q3.answers = [{
        text: "ne",
        isCorrect: false
    },
    {
        text: "da",
        isCorrect: true
    },
    {
        text: "maximum silbI",
        isCorrect: true
    }];

    await q1.save();
    await q2.save();
    await q3.save();
}

const mockForms = async () => {
    const f1 = new Form();

    f1.description = "lorem";
    f1.type = ATTESTATION;
    f1.archived = false;

    const author = await User.findOne()

    if (author) {
        f1.author = toIUserWithId(author)
    }

    const questions = await Question.find();

    f1.questions = questions;

    await f1.save()
}

const mockPR = async () => {
    const pr = new PerfomanceReview();

    pr.name = "Сафоненко Максим"

    const empl = await User.findOne();
    const form = await Form.findOne({ description: "lorem" })

    if (form && empl) {
        pr.events = [{
            form: form,
            employee: empl,
            type: ATTESTATION,
            isFinished: false
        }]
        
        pr.author = empl    
        pr.employee = empl
    }

    pr.dateOfOneToOne = new Date()
    
    await pr.save()
}

export const datamocks = async () => {
    await mockQuestions()
    await mockForms()
    await mockPR()
}