const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/create',userController.createCode);
router.post('/check',userController.checkCode);
router.post('/users/update', userController.updateUserInfo);
router.post('/psychologists/update', userController.updatePsychologistInfo);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password',userController.resetPassword);

router.post('/update_avatar',userController.updateAvatar);
router.get('/psychologists', userController.getPsychologists);

//
router.get('/ClientsTimes', userController.clientsTimes);
router.get('/ClientsDays', userController.clientsDays);
router.get('/available-times', userController.getAvailableTimes);
router.post('/update-database1', userController.updateDatabase1);
router.post('/PsychoInfos', userController.createPsychoInfo);
router.get('/PsychoInfo', userController.getPsychoInfos);
router.get('/getName', userController.getName);


//
router.post('/addWrite',userController.addWrite);
router.post('/addDate',userController.addDate);
router.post('/deleteDate',userController.deleteDate);
router.post('/deleteWrite',userController.deleteWrite);
router.post('/getFreeDate',userController.getFreeDate);
router.post('/getFreeTime',userController.getFreeTime);
router.post('/getDates',userController.getDates);
router.post('/getPsyWrites',userController.getPsyWrites);
router.post('/getClientWrites',userController.getClientWrites);
module.exports = router;