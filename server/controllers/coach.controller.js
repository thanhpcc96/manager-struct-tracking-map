import CoachModel from '../models/coach.model';
export async function _getAllCoach(req, res, next) {
    try {
        return res.status(200).json({ err: false, result: await CoachModel.find({}) })
    } catch (err) {
        return res.status(503).json({ err: true, message: "Loi ko the ket noi " + err })
    }
}
export async function _postAddNewCoach(req, res, next) {

}