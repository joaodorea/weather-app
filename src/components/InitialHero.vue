<template>
  <div class="row">
    <h1>Should I take my umbrella?</h1>
    <img alt="An open umbrella" src="../assets/imgs/umbrella.png" />
  </div>
</template>

<script>
export default {
  name: 'InitialHero'
}
</script>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  
  h1 {
    font-size: 4rem;
    line-height: 1.3;

    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
      font-size: 2rem;
    }
  }
}
</style>
