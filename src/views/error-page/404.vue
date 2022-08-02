<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/images/404.png" alt="404" />
        <img
          class="pic-404__child left"
          src="@/assets/images/404-cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="@/assets/images/404-cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="@/assets/images/404-cloud.png"
          alt="404"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">哎呀!迷路了～</div>
        <div class="bullshit__headline">你没有权限去该页面或者该页面不存在</div>
        <div class="bullshit__info">
          请检查您是否有改页面的权限或者输入的URL是否正确，5秒后将自动返回首页或者您可点击下面的按钮返回首页。
        </div>
        <a href="" class="bullshit__return-home">{{ timerLabel }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage404',
  data() {
    return {
      timer: null,
      timerLabel: '返回首页'
    };
  },
  mounted() {
    let time = 5;
    this.timerLabel = `${time}秒后将返回首页`;
    this.timer = setInterval(() => {
      time -= 1;
      if (time <= 0) {
        clearInterval(this.timer);
        this.$router.replace('/');
      } else {
        this.timerLabel = `${time}秒后将返回首页`;
      }
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}

.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;

  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloud-left;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloud-mid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloud-right;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloud-left {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloud-mid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloud-right {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;

    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slide-up;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slide-up;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slide-up;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slide-up;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
      padding: 0 15px;
    }
    @keyframes slide-up {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
