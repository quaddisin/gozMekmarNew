<template>
    <div class="p-fluid" style="margin-top:150px">
        <div class="p-grid p-justify-center">
            <div class="p-col-12 p-lg-8">
                <div class="card card-w-title">
                    <h1>Kullanici Girisi</h1>
                    <div class="p-grid">
                        <div class="p-col-2">
                            <label htmlFor="input">Kullanıcı Adı</label>
                        </div>
                        <div class="p-col-2">
                            <InputText v-model="user.username"></InputText>
                        </div>
                        <div class="p-col-2">
                            <label htmlFor="input">Şifre</label>
                        </div>
                        <div class="p-col-2">
                            <InputText v-model="user.password" v-on:keyup.enter="login" :feedback="false"></InputText>
                        </div>
                    </div>
                    <div class="p-grid p-justify-center">
                        <div class="p-col-5">
                            <ButTon label="Giriş" @click="login"></ButTon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoginService from '../service/LoginService';
export default {
    data() {
        return {
            loginService: null,
            user: {
                username: '',
                password:''
            }
        }
    },
    methods: {
        login() {
            this.loginService.kullaniciGiris(this.user).then(data => {
                const userBilgi = data.user;
                localStorage.setItem('auth_token', userBilgi.token)
                localStorage.setItem('user', JSON.stringify(userBilgi))
                this.$router.push('/')
                
            })
        }
    },
    created() {
        this.loginService = new LoginService()
    }
}
</script>