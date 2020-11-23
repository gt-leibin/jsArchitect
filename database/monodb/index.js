const mongoose =  require('mongoose');
const conn = mongoose.createConnection('mongodb://work:work@localhost:27017/work', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



let studentsScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
});

const HomeworkScheme = mongoose.Schema({
    title: String,
    content: String,
    Student: {
        ref: studentsScheme,
        type: mongoose.SchemaType.ObjectId
    }
}, {collection: 'homework'});


conn.on('connected', async () => {
    console.log('连接成功');


    let Student = conn.model('student', studentsScheme);
    const homeCol =  conn.model('homework', HomeworkScheme);

    // let r = Student.create([
    //     {
    //         name: 'Tom',
    //         pwd: '121',
    //         age: 12
    //     },
    //     {
    //         name: 'Tom',
    //         pwd: '121',
    //         age: 12
    //     }
    // ]).then(data => {
    //     console.log('data', data);

    //     conn.close();
    // });

    // let updateResult = await Student.updateOne({age: {$gt: 10}}, {$inc: {age: 5}});
    // console.log('updateResult', updateResult);

    // 先查询 排序 跳过 限制
    // let findResult = Student.find({age: {$gt: 15}}).sort().skip().limit();
    // console.log('findResult', findResult);

    let stu = await Student.create([
        {
            name: 'Tom',
            pwd: '121',
            age: 12
        },
        {
            name: 'Tom',
            pwd: '121',
            age: 12
        }
    ]);
    homeCol.create([{title: '标题', content: 'homeworkhomeworkhomeworkhomework', student: user._id}])


    conn.close();

});

