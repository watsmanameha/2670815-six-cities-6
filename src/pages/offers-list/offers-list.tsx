import type { FC } from 'react';
import { useState, useCallback } from 'react';
import type { Offer } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  onActiveOfferChange?: (activeOfferId: string | null) => void;
};

const OffersList: FC<OffersListProps> = ({
  offers,
  className = 'cities__places-list places__list tabs__content',
  imageWidth = 260,
  imageHeight = 200,
  onActiveOfferChange,
}) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    setActiveOfferId(id);
    onActiveOfferChange?.(id);
  }, [onActiveOfferChange]);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(null);
    onActiveOfferChange?.(null);
  }, [onActiveOfferChange]);

  return (
    <div className={className} data-active-offer-id={activeOfferId ?? ''}>
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <PlaceCard
            offer={offer}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        </div>
      ))}
    </div>
  );
};

export default OffersList;
