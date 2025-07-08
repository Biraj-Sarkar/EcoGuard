import { ethers } from 'ethers';
import Rewards from '../models/Rewards.js'; // Import the Rewards model

class BlockchainService {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.BLOCKCHAIN_WALLET_PRIVATE_KEY, this.provider);
    this.contractABI = null;
    this.contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;
    this.contract = null;
  }

  async init() {
    try {
      this.contractABI = (await import('../blockchain/contracts/EcoGuardABI.json')).default;
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      throw new Error('Blockchain service initialization failed');
    }
  }

  /**
   * Log CO₂ savings to blockchain and update rewards
   * @param {string} userId 
   * @param {number} co2Amount (in kg)
   * @param {string} activityType 
   * @returns {Promise<string>} transaction hash
   */
  async logCO2Reduction(userId, co2Amount, activityType) {
    try {
      const tx = await this.contract.logActivity(
        userId,
        ethers.utils.parseUnits(co2Amount.toString(), 18),
        activityType,
        { gasLimit: 300000 }
      );
      await tx.wait();

      // Update the user's rewards after logging the CO₂ reduction
      await Rewards.findOneAndUpdate(
        { userId },
        { $inc: { greenPoints: co2Amount } }, // Assuming 1 kg CO₂ = 1 Green Point
        { new: true, upsert: true } // Create if not exists
      );

      return tx.hash;
    } catch (error) {
      console.error('Blockchain transaction failed:', error);
      throw new Error('Failed to log CO₂ reduction');
    }
  }

  /**
   * Get total CO₂ saved by user
   * @param {string} userId 
   * @returns {Promise<number>} CO₂ saved in kg
   */
  async getUserCO2Saved(userId) {
    try {
      const totalSaved = await this.contract.getUserCO2Saved(userId);
      return parseFloat(ethers.utils.formatUnits(totalSaved, 18));
    } catch (error) {
      console.error('Failed to get CO₂ savings:', error);
      throw new Error('Failed to fetch blockchain data');
    }
  }
}

// Singleton instance
const blockchainService = new BlockchainService();
export default blockchainService;

// Usage example (in your main application file or controller):
(async () => {
  try {
    await blockchainService.init(); // Initialize the service
    console.log('Blockchain service initialized successfully');
  } catch (error) {
    console.error('Error initializing blockchain service:', error);
  }
})();
