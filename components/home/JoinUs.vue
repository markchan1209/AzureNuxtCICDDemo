<template>
  <div class="join">
    <div class="join-title">{{ $t('start_rebate_journey') }}<br />{{ $t('three_steps') }}</div>
    <div class="join-step">
      <div class="join-step-item">
        <div class="join-number">
          <img src="@/assets/img/home/01.png" alt="number-01" />
        </div>
        <div class="join-main">
          <div class="title">{{ $t('join_fdb') }}</div>
          <div class="info">{{ $t('quick_member_registration') }}</div>
        </div>
      </div>
      <div class="join-step-item">
        <div class="join-number">
          <img src="@/assets/img/home/02.png" alt="number-02" />
        </div>
        <div class="join-main">
          <div class="title">{{ $t('bound_exchange') }}</div>
          <div class="info">{{ $t('enter_exchange_information') }}</div>
        </div>
      </div>
      <div class="join-step-item">
        <div class="join-number">
          <img src="@/assets/img/home/03.png" alt="number-03" />
        </div>
        <div class="join-main">
          <div class="title">{{ $t('start_rebate') }}</div>
          <div class="info">{{ $t('you_trade_i_rebate') }}<br />{{ $t('enjoy_rebate') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.join {
  position: relative;
  max-width: 1440px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  box-shadow: 0 4px 9px rgb(0 0 0 / 30%);
  margin: 4vw auto 12vw auto;
  padding: 43px 45px;
  display: flex;
  align-items: center;
  z-index: 10;
  @media screen and (max-width: 1500px) {
    margin: 0px 3% 12vw 3%;
  }
  &-title {
    width: 22%;
    font-size: 26px;
    font-weight: bold;
    padding: 45px 0;
    margin-right: 26px;
    color: white;
  }
  &-step {
    flex: 1;
    display: flex;
    &-item {
      flex: 1;
      position: relative;
      margin: 0 8px;
      background: #1b212e;
      border-radius: 8px;
      .join-number {
        position: absolute;
        left: 30px;
        top: -16px;
        width: 53px;
      }
      .join-main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        padding: 0px 30px;
        .title {
          padding: 14% 0 8% 0;
          font-weight: bold;
          font-size: 24px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-bottom: 20px;
          font-size: 16px;
          line-height: 150%;
        }
      }
    }
  }
}
/*1024*/
@media screen and (min-width: 1000px) and (max-width: 1346px) {
  .join {
    padding: 16px;
    // &-title {
    //   font-size: 28px;
    // }
    &-step {
      &-item {
        .join-number {
          left: 16px;
          top: -13px;
          width: 43px;
        }
        .join-main {
          padding: 0px 18px;
          .info {
            font-size: 14px;
          }
        }
      }
    }
  }
}
/*768*/
@media screen and (min-width: 750px) and (max-width: 999px) {
  .join {
    padding: 16px;
    &-title {
      font-size: 20px;
      margin-right: 14px;
    }
    &-step {
      &-item {
        .join-number {
          left: 14px;
          top: -9px;
          width: 32px;
        }
        .join-main {
          .title {
            padding: 26% 0 16% 0;
            font-size: 18px;
          }
          .info {
            font-size: 12px;
          }
        }
      }
    }
  }
}
/*540*/
@media screen and (min-width: 500px) and (max-width: 749px) {
  .join {
    padding: 16px;
    flex-direction: column;
    margin: 0px 5% 12vw 5%;
    &-title {
      width: auto;
      font-size: 30px;
      margin-right: 0px;
      margin-bottom: 36px;
      padding: 20px 0;
      text-align: center;
    }
    &-step {
      flex-direction: column;
      &-item {
        margin-bottom: 50px;
        .join-number {
          left: 28px;
          top: -20px;
        }
        .join-main {
          .title {
            font-size: 30px;
          }
          .info {
            font-size: 22px;
            padding-bottom: 50px;
          }
        }
      }
    }
  }
}
/*320*/
@media screen and (min-width: 300px) and (max-width: 499px) {
  .join {
    padding: 0px;
    flex-direction: column;
    margin: 0px 5% 12vw 5%;
    &-title {
      width: auto;
      font-size: 20px;
      margin-right: 0px;
      margin-bottom: 36px;
      padding: 20px 0;
      text-align: center;
    }
    &-step {
      flex-direction: column;
      &-item {
        margin-bottom: 50px;
        .join-number {
          left: 20px;
          top: -14px;
          width: 44px;
        }
        .join-main {
          padding: 10px 42px 14px 12px;
          .title {
            font-size: 20px;
          }
          .info {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
