import './styles/style.scss';
import './components/slider';
import './components/animations';
import './components/nav';
window.Webflow ||= [];
window.Webflow.push(() => {
  $('.sign_field').each(function (index, el) {
    new google.maps.places.Autocomplete(el, {
      types: ['postal_code'],
      componentRestrictions: { country: 'fr' },
      language: 'fr',
    });
  });
});
