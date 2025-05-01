<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="row flex-center text-h5">
          Convolutional Neural Network
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-scroller
        reverse
        position="bottom-right"
        :scroll-offset="10"
        :offset="[20, 20]">
        <q-btn
          fab
          icon="keyboard_arrow_down"
          color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>
