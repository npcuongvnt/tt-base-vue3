<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';
import { googleTokenLogin, decodeCredential } from 'vue3-google-login';
import { LogarithmicScale } from 'chart.js';

// import { initFbsdk } from '@/config/facebook.oauth.js';

const store = useStore();
const router = useRouter();
const { layoutConfig } = useLayout();
const username = ref('');
const password = ref('');
const checked = ref(false);
const loading = ref(false);
const message = ref('');
// const loginLabel = $t('resource_authen.sign_in');

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

onMounted(() => {
    // initFbsdk();
});

/**
 * Đăng nhập
 */
function signIn() {
    message.value = '';
    loading.value = true;

    //Develop thì cho pass luôn
    if (import.meta.env.DEV) {
        router.push({
            name: 'dashboard'
        });
        loading.value = false;
        return;
    }

    store.dispatch('auth/login', { userName: username.value, password: password.value }).then(
        (res) => {
            let resMessage = null;

            if (!(res && res.success)) {
                resMessage = 'Đăng nhập thất bại';
                switch (res?.responseCode) {
                    case 'WRONG_USERNAME_OR_PASSWORD':
                        resMessage = 'Sai tên đăng nhập hoặc mật khẩu';
                        break;
                    case 'NOT_EXIST_USER':
                        resMessage = 'Không tồn tại người dùng';
                        break;
                }
            }

            requestLoginDone(resMessage);
        },
        (error) => {
            requestLoginDone(error.message);
        }
    );
}

const callbackGoogleSignIn = (response) => {
    // decodeCredential will retrive the JWT payload from the credential
    const userData = decodeCredential(response.credential);
    console.log('Handle the userData', userData);
};

function signInWithGoogle() {
    googleTokenLogin().then((response) => {
        console.log('Handle the response:', response);
        // response = {
        //     access_token: 'ya29.a0AfB_byDkFYgIpWZuTVYHJayjgHffdQtczNfK_GgA9Y1-RGD970oH9W0Sw-tFaLIOrRuA3xcqgIFgnWAwrzhNBCwrbP2gDzZwxIVOKVHlv6LM_nHnjJ6GCMHM4FBLsa7R7NqdMa8XqLC_CR00PXi_L4ItMcdo6WoyTAaCgYKAXoSARESFQHGX2MiuTTdfu6gsuGcr48uQdZ5Rg0169',
        //     authuser: '0',
        //     expires_in: 3599,
        //     prompt: 'none',
        //     scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
        //     token_type: 'Bearer'
        // }
        // logic tiếp theo
        //1: call api để gửi response khi đăng nhập xuống server
        //2: Thực hiện validate token, lấy thông tin người dùng
        //3: Thêm/Sửa thông tin người dùng vào database
        //4: Sinh token riêng của hệ thống, trả về cho client tương tự đăng nhập thành công
    });
}

function signInWithFacebook() {
    window.FB.login((response) => {
        if (response && response.authResponse) {
            console.log('response', response);
            var userInfo = {
                loginType: 'fb',
                fb: {
                    auth: response.authResponse
                }
            };
            this.$store.commit('setLoginUser', userInfo);
            window.FB.api(
                `/${response.authResponse.userID}`,
                (userResponse) => {
                    if (userResponse) {
                        console.log(userResponse);
                        var userInfo = {
                            loginType: 'fb',
                            fb: {
                                auth: response.authResponse,
                                user: userResponse
                            }
                        };
                        this.$store.commit('setLoginUser', userInfo);
                    }
                },
                this.params
            );
            router.push('/home');
        }
    }, this.params);
}

function requestLoginDone(errMessage) {
    //Không loading nữa
    loading.value = false;

    //Nếu có lỗi xảy ra
    if (errMessage) {
        message.value = errMessage;
    } else {
        //Navigate đến trang chính
        router.push({
            name: 'dashboard'
        });
    }
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">{{ $t('resource_authen.welcome') }}</div>
                        <span class="text-600 font-medium">{{ $t('resource_authen.sign_to_continue') }}</span>
                    </div>

                    <div>
                        <label for="username1" class="block text-900 text-xl font-medium mb-2">{{ $t('resource_authen.username') }}</label>
                        <InputText id="username1" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">{{ $t('resource_authen.password') }}</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="p-error mb-3" v-if="message">{{ message }}</div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">{{ $t('resource_authen.remember') }}</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">{{ $t('resource_authen.forgot_password') }}</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" :loading="loading" @click="signIn()"></Button>
                        <div class="flex align-items-center justify-content-center mt-3">
                            <label for="">Hoặc đăng nhập bằng</label>
                        </div>
                        <div class="flex align-items-center justify-content-center mt-3 gap-5">
                            <Button severity="secondary" text rounded aria-label="google" @click="signInWithGoogle()">
                                <i class="pi pi-google" rounded style="font-size: 2rem; color: #4285f4"></i>
                            </Button>
                            <Button severity="secondary" text rounded aria-label="facebook" @click="signInWithFacebook()">
                                <i class="pi pi-facebook" rounded style="font-size: 2rem; color: #4267b2"></i>
                            </Button>
                            <GoogleLogin :callback="callbackGoogleSignIn" prompt auto-login />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
