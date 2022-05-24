<template>
  <div
    id="fade"
    class="ModalWindow"
  >
    <div
      id="modal"
      class="ModalWindow__modal"
    >
      <div class="modal__content">
        <i
          role="button"
          class="fa fa-times ModalWindow__icon"
          @click="$emit('closeModal')"
        />
        <div class="modal__header">
          <slot name="header" />
        </div>

        <div class="modal__description">
          <slot name="description" />
        </div>
      </div>
      <slot name="background" />
    </div>
  </div>
</template>

<script setup lang="ts">

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeModal']);

</script>

<style lang="sass">
.ModalWindow
  position: absolute
  background: rgba(0, 0, 0, 0.5)
  transition: opacity 200ms
  opacity: 1
  bottom: 0
  left: 0
  right: 0
  top: 0

  &__icon
    border-radius: 50%
    font-size: 14px
    font-weight: 400
    height: 14px
    padding: 3px
    position: absolute
    right: 20px
    text-align: center
    top: 18px
    width: 14px
    &:hover
      color: #5461c4
      cursor: pointer

  &__modal
    background: #ffffff
    border-radius: 0.5em
    box-shadow: 0 10px 20px rgba(black, 0.2)
    left: 50%
    top: 50%
    width: 30%
    height: 30%
    position: absolute
    transform: translate(-50%, -50%)
    z-index: 21

    .modal__content
      padding: 20px 10px
      height: 100%

    .modal__header
      justify-content: center
      display: flex
      border-bottom: solid 1px lighten(grey, 40%)
      color: #5461c4
      display: flex
      font-size: 22px
      font-weight: 600
      padding-bottom: 20px

    .modal__description
      padding: 20px 10px
      font-size: 16px
      font-weight: 400
      height: 80%


</style>
