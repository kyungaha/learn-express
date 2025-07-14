//export를 해줘야 다른 파일에서 import 해서 사용할 수 있음
const users = [
    {
        id: 1752476777027,
        name : "kong",
        mbti : "ESFJ"
    }, {
        id: 1752476845300,
        name : "seok",
        mbti : "ISFJ"
    }, {
        id: 1752476850851,
        name : "sooo",
        mbti : "ESTJ"
    }
]

//변수 앞 export 선언과 같은 동작
module.exports={users}