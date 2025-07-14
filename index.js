const express = require("express");
const app = express(); // express 구축
const dotenv = require("dotenv");
const { users } = require("./data");

//.use : use안에 적힌 미들웨어를 사용하겠다는 의미
// 하위 2줄 코드가 있어야 json 이 파싱되어서 백엔드코드에서 사용가능함
app.use(express.json()); // express.json 을 넣지 않으면 json 문법을 사용할 수 없음.
app.use(express.urlencoded({extended:true})); 

// 환경변수 로드
dotenv.config();

// CRUD
app.get('/', (req, res) => {
    res.json({ message: "후츠릿짱"});
});

app.get('/user', (req, res) => {
    res.json({ message:"user test!@#$", name: "Kong", mbti: "ESFJ"}).status(200);
});

//특정 ID값이 데이터 조회
// "/user/1752476288657"
app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    console.log("🚀 ~ app.get ~ id:", id, "type:", typeof id)
    const findItem = users.find((item) => item.id === Number(id)) // 객체 or undefined
    console.log("🚀 ~ findItem ~ findItem:", findItem)
    if(!findItem) {
    //매칭된 사용자가 없는 경우
        res.status(404).json({message: "사용자를 찾을 수 없습니다."});
    } else {
    // 매칭된 사용자가 있는 경우
        res.status(200).json({findItem});
    }
  
});

app.post("/user", (req, res) => {
    // const userInfo = req.body; //요청할 때는 body
    // console.log("message", userInfo.message, "name", userInfo.name, "mbti", userInfo.mbti);

    // //응답코드
    // res.status(201).json({
    //     id: Date.now(), 
    //     name: userInfo.name+"💜💗", 
    //     mbti: `${userInfo.mbti}😛`
    // });

    // 미션 : 사용자 입력값 받아서 id를 포함한 객체를 users에 추가한 후에,
    // users 데이터 반환
    const userId = req.body;
    console.log("🚀 ~ app.post ~ userId:", userId.id)

    const findItemPo = users.find((item) => item.id === Number(userId.id))
    console.log("🚀 ~ app.post ~ findItemPo:", findItemPo)

    const newUser = {
       id: Date.now(), 
       name: userId.name+"❣💕", 
       mbti: `${userId.mbti}😎`
    }

    const addUser = [...users, newUser]; // 원본 배열은 수정하지 않고, 받은 데이터만 추가한다.

    res.status(200).json({data: addUser});
});

const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT, () => {
    console.log("Server Running at...");
});