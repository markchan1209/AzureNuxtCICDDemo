<template>
  <div style="background-color: #ffffff; color: #616161; letter-spacing: 0.015em; font-family: Roboto">
    <div style="width: 350px; margin: 0 auto; padding: 28px">
      <img
        src="https://fdb-web-api.azurewebsites.net/Upload/UserImage/202109270038122713/F20210927003812.png"
        alt="logo"
        style="color: #212838; font-size: 30px; font-weight: bold; text-align: center; width: 230px; margin: 26px auto; display: block"
      />
      <div style="border-top: 2px #eeeeee solid; border-bottom: 2px #eeeeee solid; padding: 20px">
        <p style="margin-bottom: 20px; line-height: 24px">
          尊敬的會員您好： <br />很抱歉，您的交易所UID綁定失敗，請前往會員頁面重新綁定交易所UID
        </p>

        <p style="margin-bottom: 10px">立即綁定開始享受返用旅程</p>
        <a
          href="https://www.google.com"
          target="_black"
          style="
            display: block;
            margin-bottom: 30px;
            font-size: 13px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #212838;
            color: #ffffff;
            text-decoration: none;
          "
        >
          前往綁定交易所
        </a>
        <p style="font-size: 13px; font-weight: bold">
          請勿將信件轉發或給予任何人
          <br />
          如有問題，
          <a href="https://www.google.com" target="_blank" style="text-decoration: none; color: #364e6a">請與我們聯繫</a>
        </p>
      </div>
      <div style="margin-top: 30px; margin-bottom: 16px; text-align: center;">
        <a href="mailto: CS@fundobit.com" target="_blank" style="display: inline-block; margin: 0 12px;">
          <img
            src="https://fdb-web-api.azurewebsites.net/Upload/UserImage/202109270038322965/F20210927003832.png"
            alt="mail"
            style="width: 26px; height: 26px; background-color: #212838; border-radius: 50%"
          />
        </a>
        <a href="https://t.me/fundobit" target="_blank" style="display: inline-block; margin: 0 12px;">
          <img
            src="https://fdb-web-api.azurewebsites.net/Upload/UserImage/202109270039036270/F20210927003903.png"
            alt="tg"
            style="width: 26px; height: 26px; background-color: #212838; border-radius: 50%"
          />
        </a>
        <a href="https://www.instagram.com/cryptocurrency.rebate" target="_blank" style="display: inline-block; margin: 0 12px;">
          <img
            src="https://fdb-web-api.azurewebsites.net/Upload/UserImage/202109270038489338/F20210927003848.png"
            alt="ig"
            style="width: 26px; height: 26px; background-color: #212838; border-radius: 50%"
          />
        </a>
      </div>
      <p style="text-align: center; font-size: 12px; margin-bottom: 10px">
        <a href="https://www.google.com" target="_blank" style="text-decoration: none">{{ $t('disclaimer') }}</a> |
        <a href="https://www.google.com" target="_blank" style="text-decoration: none">{{ $t('privacy_policy') }}</a>
      </p>
      <p style="text-align: center; font-size: 12px">Copyright © 2021 FDB.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailContent6'
}
</script>
