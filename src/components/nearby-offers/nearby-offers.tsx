import type { FC } from 'react';
import type { Offer } from '../../types/offer';
import OffersList from '../../pages/offers-list/offers-list';

type NearbyOffersProps = {
  offers: Offer[];
};

const NearbyOffers: FC<NearbyOffersProps> = ({ offers }) => (
  <OffersList
    offers={offers}
    className="near-places__list places__list"
    imageWidth={260}
    imageHeight={200}
  />
);

export default NearbyOffers;
