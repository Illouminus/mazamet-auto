import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/User";
import {NextRequest, NextResponse} from 'next/server'
const bcrypt = require("bcrypt")
export  async function POST (request: NextRequest) {
    try {
        await connect()
        const {
            username,
            password,
            email
        } = await request.json()
        const userExists = await User.findOne({email});
        if(userExists) {
            return NextResponse.json({error: 'User already exists'},
                {status: 400}
            )
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        const userObject = newUser.toObject(); // конвертация в простой JS объект
        delete userObject.password; // удаление пароля из объекта

        return NextResponse.json({
                message: "user created successfully",
                success: true,
                userObject
            },
            {status: 201}

        )
    } catch (e: any) {
        return NextResponse.json({error: e.message},
            {status: 500}
            )
    }
}
