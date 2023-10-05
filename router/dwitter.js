import express from 'express';
import ejs from 'ejs';

const router = express.Router();
let dwitterList = [
  // {
  //   pid: 100,
  //   id: 'james',
  //   name: '제임스',
  //   date: '2023.10.05',
  //   content: '안녕하세요~',
  // },
  // {
  //   pid: 101,
  //   id: 'hong',
  //   name: '홍길동',
  //   date: '2023.10.05',
  //   content: '안녕하세요~ 홍길동입니다',
  // }
];

router.use(express.json());
router.use(express.urlencoded());

// 1. GET : /dwitter - All Dwitter list
router.get('/', (req, res, next) => {
  //index.ejs(틀) + 동적데이터
  // const name = "hong";
  ejs
    .renderFile('./template/index.ejs', { dwitterList })
    .then((data) => { res.end(data); })
  //res.send('hello~~');
});
// '/dwitter' => 8080/dwitter/dwitter 이렇게 넘어옴

// http://localhost:8080/dwitter
// 2. POST : /dwitter - tweet create

router.post('/', (req, res, next) => {
  const { id, name, content } = req.body;
  const pid = Math.trunc(Math.random() * 1000);
  let date = new Date(Date.now());
  date = date.toLocaleDateString();
  dwitterList.push({ pid, id, name, date, content });
  //console.log(dwitterList);
  res.redirect('/dwitter');
});

// 3. GET : /dwitter?id=자신의 아이디 - My Dwitter List 
//    GET : /dwitter/:id
// 4. PUT : /dwitter/id - My Dwitter update (update=put)
router.put('/', (req, res, next) => {
  const { pid, content } = req.body;
  // console.log({ pid, content });
  dwitterList.filter((dwitter) => {
    if (dwitter.pid === parseInt(pid)) {
      console.log("----------->");
      dwitter.content = content;
    }
  });
  //console.log(dwitterList);
  res.status(204).send('update success!!');
});

// 5. DELETE : /dwitter/:id - My Dwitter delete
router.delete('/', (req, res, next) => {
  const { pid } = req.body;
  dwitterList = dwitterList.filter((dwitter) => {
    dwitter.pid !== parseInt(pid);
    res.status(204).send('delete success')
  });
});


export default router;
// router 쓰려면   "type": "module" 설정해야함
