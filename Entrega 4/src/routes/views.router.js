import {Router} from 'express';

const router = Router();

router.get('/', (req, res) =>{
    res.render('index', {layout: 'index'});
})

router.get('/realtimeproducts', (req, res) => {
    console.log("START /realTimeProducts");
    res.render('layouts/realTimeProducts', {layout: 'realTimeProducts'});
  });

export default router;