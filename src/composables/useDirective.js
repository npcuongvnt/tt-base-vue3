import BadgeDirective from 'primevue/badgedirective';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Tooltip from 'primevue/tooltip';

export const useDirective = (app) => {
    app.directive('tooltip', Tooltip);
    app.directive('badge', BadgeDirective);
    app.directive('ripple', Ripple);
    app.directive('styleclass', StyleClass);
};
