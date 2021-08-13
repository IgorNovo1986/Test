<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input 
            v-model="searchQuery"
            placeholder="поиск..."
        >
        </my-input>
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
        Cоздать пост
        </my-button>
        <my-select 
            v-model="selectedSort"
            :options="sortOptions"
        />
        </div>
        <my-dialog 
            :value="dialogVisible" 
            @click="hideDialog">
            <post-form 
                @create="createPost"
            />
        </my-dialog> 
        <post-list 
            :posts="sortedAndSearchedPosts"
            @remove ="removePost"  
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка....</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from 'axios';
import { config } from 'vue/types/umd';

export default {
    components: {
      PostForm,
      PostList,
    },
    data () {
        return {
           posts: [],
           dialogVisible: false,
           isPostsLoading: false,
           selectedSort: '',
           searchQuery: '',
           page: 1,
           limit: 10,
           sortOptions: [
               {value: 'title',name: 'По названию'},
               {value: 'body',name: 'По cодержимому'},
           ]
        }
    },
    methods: {
        createPost (post) {
            this.posts.push(post);
            this.hideDialog()
        },
        removePost (post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog () {
            this.dialogVisible = true;
        },
        hideDialog () {
            this.dialogVisible = false;
        },
        async fetchPosts () {
            try {
                this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.posts = response.data;
            } catch (e) {
                alert("Ошибка")
            } finally {
                this.isPostsLoading = false;
            }
        } 
    },
    created () {
            this.fetchPosts();
    },
    computed: {
        sortedPosts () {
            console.log("выбрано")
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
        sortedAndSearchedPosts () {
            return this.sortedPosts.filter(post => post.title.toLowerCase().this.includes(this.searchQuery.toLowerCase()))
        }
    }
    // watch: {
    //     selectedSort () {
    //         this.posts.sort( (a, b) => { 
    //             return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
    //         })
    //     }
    // }
}

</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app{
        padding: 20px;
    }

    .app__btns {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }

</style>