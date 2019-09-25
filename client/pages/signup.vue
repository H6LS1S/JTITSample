<template>
  <v-col mx="3">
    <v-card>
      <ValidationObserver
        v-slot="{ invalid }"
        ref="observer"
        tag="form"
        @submit.prevent="onSubmit"
      >
        <v-progress-linear :indeterminate="progress" :active="progress" />
        <v-card-title class="title font-weight-regular justify-center">
          <span>{{ currentTitle }}</span>
        </v-card-title>
        <v-window v-model="step" touchless>
          <v-window-item :value="1">
            <v-card-text>
              <VTextFieldValidation
                v-model="userCredentials.email"
                type="email"
                rules="required|email"
                outlined
                autofocus
                label="Email"
                autocomplete="email"
                prepend-icon="mdi-email-outline"
              />
              <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <VTextFieldValidation
                v-model="userCredentials.password"
                :type="show1 ? 'text' : 'password'"
                :append-icon="changeVisibility(show1)"
                rules="required|min:8"
                vid="confirm"
                outlined
                autofocus
                counter
                label="Password"
                autocomplete="new-password"
                prepend-icon="mdi-lock-outline"
                @click:append="show1 = !show1"
              />
              <VTextFieldValidation
                :type="show2 ? 'text' : 'password'"
                :append-icon="changeVisibility(show2)"
                rules="required|confirmed:confirm"
                outlined
                counter
                label="Confirmed password"
                autocomplete="new-password"
                prepend-icon="mdi-lock-reset"
                @click:append="show2 = !show2"
              />
              <span class="caption grey--text text--darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://i.pinimg.com/originals/71/c0/68/71c068478e7499d73ec005eacbe42c10.gif"
              />
              <h3 class="title font-weight-light mb-2">Welcome to Test</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>
        <v-card-actions v-if="step !== 3">
          <v-btn v-if="step === 1" href="/signin" text>Sign In</v-btn>
          <v-btn v-else text @click.prevent="onBack">Back</v-btn>
          <v-spacer />
          <v-btn
            v-if="step !== 3"
            :disabled="invalid"
            @click="onSubmit"
            depressed
            color="primary"
          >
            Next
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';
import { Action } from 'vuex-class';

@Component({
  middleware: ['guest'],
  components: {
    ValidationObserver,
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign Up';
        case 2:
          return 'Create a password';
        default:
          return 'Account created';
      }
    },
  },
})
export default class SignUpPage extends Vue {
  @Action('registrationUser') registrationUser;

  private step: number = 1;
  private show1: boolean = false;
  private show2: boolean = false;
  private progress: boolean = false;
  private userCredentials = {
    email: '',
    password: '',
  };

  private changeVisibility(condition) {
    return condition ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
  }

  private onBack() {
    requestAnimationFrame(() => {
      this.$refs.observer.reset();
    });

    return this.step--;
  }

  private async onSubmit() {
    const validation = await this.$refs.observer.validate();
    if (validation && this.step === 2) {
      this.progress = !this.progress;
      return await this.registrationUser(this.userCredentials).catch(err => {
        // TODO: Add error handle
        this.progress = !this.progress;
        this.step = 1;
      });
    }
    return this.step++;
  }
}
</script>
