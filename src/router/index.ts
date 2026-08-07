import { createRouter, createWebHistory } from 'vue-router';
import { authToken, clearAuth, currentUser, loadCurrentUser } from '../auth';
import AccountVerificationView from '../views/AccountVerificationView.vue';
import LandingView from '../views/LandingView.vue';
import LoginView from '../views/LoginView.vue';
import PendingAccountView from '../views/PendingAccountView.vue';
import ProfileView from '../views/ProfileView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/pending-account',
      name: 'pending-account',
      component: PendingAccountView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/account-verification',
      name: 'account-verification',
      component: AccountVerificationView,
      meta: { requiresAuth: true, requiresHrManager: true },
    },
  ],
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) {
    return true;
  }

  if (!authToken.value) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  try {
    const user = currentUser.value ?? (await loadCurrentUser());

    if (
      to.meta.requiresHrManager &&
      (user.role !== 'MANAGER' || user.department !== 'HR')
    ) {
      return { name: 'profile' };
    }

    return true;
  } catch {
    clearAuth();
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router;
