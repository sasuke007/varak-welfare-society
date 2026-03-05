import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  isDonationModalOpen: boolean;
  activeCampaignId: string | null;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  openDonationModal: (campaignId: string) => void;
  closeDonationModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  isDonationModalOpen: false,
  activeCampaignId: null,
  toggleMobileNav: () =>
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  openDonationModal: (campaignId) =>
    set({ isDonationModalOpen: true, activeCampaignId: campaignId }),
  closeDonationModal: () =>
    set({ isDonationModalOpen: false, activeCampaignId: null }),
}));
