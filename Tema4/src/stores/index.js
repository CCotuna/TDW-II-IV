import { defineStore } from 'pinia';

export const useVerseStore = defineStore('verse', {
    state: () => ({
        verse:'',
        previousVerses: [],
    }),
});