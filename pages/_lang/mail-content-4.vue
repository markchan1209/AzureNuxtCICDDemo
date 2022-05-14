<template>
  <div style="background-color: #ffffff; color: #616161; letter-spacing: 0.015em; font-family: Roboto">
    <div style="width: 350px; margin: 0 auto; padding: 20px">
      <img
        src="https://fdb-web-api.azurewebsites.net/Upload/UserImage/202109270038122713/F20210927003812.png"
        alt="logo"
        style="color: #212838; font-size: 30px; font-weight: bold; text-align: center; width: 230px; margin: 26px auto; display: block"
      />
      <div style="border-top: 2px #eeeeee solid; border-bottom: 2px #eeeeee solid; padding: 20px">
        <p style="margin-bottom: 20px; line-height: 24px">
          尊敬的會員您好：<br />
          已收到您的出金申請，將於2~5個工作天到帳
        </p>
        <div style="border-radius: 8px; background-color: #e5e5e5; line-height: 24px; color: #364e6a; padding: 12px 20px">
          申請時間：<span style="font-weight: bold;">14:30</span><br />
          {{ $t('apply_coin_type') }}：<span style="font-weight: bold;">BTC</span><br />
          {{ $t('apply_number') }}：<span style="font-weight: bold;">0.024</span><br />
          {{ $t('application_number') }}：<span style="font-weight: bold;">FDB111111111</span>
        </div>
        <p style="line-height: 26px; margin: 34px 0px">您的帳戶正在登錄<br />IP 位置：190.190.190.190</p>
        <p style="font-size: 13px; font-weight: bold">
          如您未申請出金，
          <a href="https://www.google.com" target="_blank" style="text-decoration: none; color: #364e6a">請即時修改密碼</a>
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
  name: 'MailContent4'
}
</script>
