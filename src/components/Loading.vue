<template>
  <div class="wrap">
    <div class="loading">
      <div class="bounceball"></div>
      <div class="text">SUDES PHONE</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Montserrat);

// ボールのサイズ
$width: 15px;
$height: 15px;

// バウンドの距離
$bounce_height: 30px;

body {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: Montserrat;
}

.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  color: #000000;
  display: inline-block;
  margin-left: 5px;
  font-weight: 500;
  font-size: 25px;
}

.bounceball {
  position: relative;
  display: inline-block;
  height: 37px;
  width: $width;

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: $width;
    height: $height;
    border-radius: 50%;
    background-color: #000000;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
}

@keyframes bounce {
  0% {
    top: $bounce_height;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }

  35% {
    height: $height;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0;
  }
}
</style>
