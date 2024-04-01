<script setup>
import { useVerseStore } from './stores';
import axios from 'axios';

const verseStore = useVerseStore();

const fetchVerse = async () => {
  axios({
    method: 'GET',
    url: 'http://localhost:3000',
  })
    .then((response) => {
      console.log("Response: ", response.data);
      verseStore.verse = response.data;

      verseStore.previousVerses.unshift(response.data);

      if (verseStore.previousVerses.length > 5) {
        verseStore.previousVerses.pop();
      }

      localStorage.setItem('previousVerses', JSON.stringify(verseStore.previousVerses));
    })
}

if (localStorage.getItem('previousVerses')) {
  verseStore.previousVerses = JSON.parse(localStorage.getItem('previousVerses'));
}

const previousVerses = verseStore.previousVerses;

</script>

<template>
  <!-- https://bible-api.com/ -->
  <div class="flex space-x-20 m-16">
    <div>
      <button @click="fetchVerse" class="px-5 py-2 bg-red-800 text-white rounded">Load another verse</button>
    </div>
    <div>
      <div class="block max-w-sm p-6 bg-white border border-red-800 rounded-lg shadow hover:bg-gray-100">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Versetul zilei</h5>
        <p class="font-normal text-gray-700">{{ verseStore.verse.reference }}</p>
        <p class="font-normal text-gray-700">{{ verseStore.verse.text }}</p>
      </div>

    </div>
    <div>
      <div class="block max-w-sm p-6 bg-white border border-red-800 rounded-lg shadow hover:bg-gray-100">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Verses History (last 5)</h5>
        <ul class="space-y-5">
          <li v-for="(previousVerse, index) in verseStore.previousVerses" :key="index"
            class="font-normal text-gray-700"> <span>
              {{ previousVerse.reference }} <br>
              {{ previousVerse.text }}
            </span></li>
        </ul>
      </div>

    </div>
  </div>

</template>

<style scoped></style>
