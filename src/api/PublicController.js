import svgCaptcha from "svg-captcha";
import { setValue } from "../config/RedisConfig";

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const body = ctx.request.query;
    console.log(body.sid);
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: "0o1il",
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    });
    console.log(newCaptca);
    //保存图片验证码数据，设置超时时间，单位是秒
    setValue(body.sid, newCaptca.text, 10 * 60);
    // getValue(body.sid).then(res => {
    //   console.log(res);
    // });
    ctx.body = {
      code: 200,
      data: newCaptca.data
    };
  }
}

export default new PublicController();
