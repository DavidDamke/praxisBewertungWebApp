<template>
   <div id="nav">
        <div id="login" @click="rwuLogin">Login RWU</div>
        <div id="login" @click="gastLogin">Login Gast</div>
    
   </div>
</template>

<script>
export default {
 methods:{
    gastLogin(){
        this.$router.push('/loginGast');
    },
    rwuLogin(){
        this.$router.push('/loginRwu');
    }
 }
}
</script>

<style>
    #nav{
        display: flex;
        justify-content: center;
    }
    #login{
        background-color: rgb(65, 145, 211);
        width: 200px;
        height: 200px;
        padding: 10px;
        margin: 2px;
    }

</style>