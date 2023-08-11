import { BlockchainIndexingStatus } from "../../data/blockchain_indexing_status";
import { Blockchain, BlockchainIndexType } from "../../enums";

describe("BlockchainIndexingStatus", () => {
    afterEach(async () => {
        await BlockchainIndexingStatus.clearDatabase();
      });
    
    describe("create", () => {
      test("creates entry", async () => {
        const indexingStatus = await BlockchainIndexingStatus.upsert(
          Blockchain.POLYGON,
          BlockchainIndexType.TRANSFERS,
          1000
        );
        expect(indexingStatus).toBeDefined();
        expect(indexingStatus.id).toContain("bist_");
        expect(indexingStatus.blockchain).toBe(Blockchain.POLYGON);
        expect(indexingStatus.type).toBe(BlockchainIndexType.TRANSFERS);
        expect(indexingStatus.blockNumber).toEqual(1000);
      });
  ​
      test("updates entry", async () => {
        const indexingStatus = await BlockchainIndexingStatus.upsert(
          Blockchain.POLYGON,
          BlockchainIndexType.TRANSFERS,
          1001
        );
  ​
        expect(indexingStatus).toBeDefined();
        expect(indexingStatus.id).toContain("bist_");
        expect(indexingStatus.blockchain).toBe(Blockchain.POLYGON);
        expect(indexingStatus.type).toBe(BlockchainIndexType.TRANSFERS);
        expect(indexingStatus.blockNumber).toEqual(1001);
  ​
        const updatedIndex = await BlockchainIndexingStatus.upsert(
          Blockchain.POLYGON,
          BlockchainIndexType.TRANSFERS,
          1002
        );
  ​
        expect(updatedIndex).toBeDefined();
        expect(updatedIndex.id).toContain("bist_");
        expect(updatedIndex.id).toBe(indexingStatus.id);
        expect(updatedIndex.blockchain).toBe(Blockchain.POLYGON);
        expect(updatedIndex.type).toBe(indexingStatus.type);
        expect(updatedIndex.blockNumber).toEqual(1002);
      });
  ​
      test("does not update updates entry if one exists and new blockNumber is less than current one", async () => {
        const indexingStatus = await BlockchainIndexingStatus.upsert(
          Blockchain.ETHEREUM,
          BlockchainIndexType.TRANSFERS,
          1000
        );
  ​
        expect(indexingStatus).toBeDefined();
        expect(indexingStatus.id).toContain("bist_");
        expect(indexingStatus.blockchain).toBe(Blockchain.ETHEREUM);
        expect(indexingStatus.type).toBe(BlockchainIndexType.TRANSFERS);
        expect(indexingStatus.blockNumber).toEqual(1000);
  ​
        const updatedIndex = await BlockchainIndexingStatus.upsert(
          Blockchain.ETHEREUM,
          BlockchainIndexType.TRANSFERS,
          999
        );
  ​
        expect(updatedIndex).toBeDefined();
        expect(updatedIndex.id).toContain("bist_");
  ​
        expect(updatedIndex.id).toBe(indexingStatus.id);
        expect(updatedIndex.blockNumber).toBe(indexingStatus.blockNumber);
        expect(updatedIndex.type).toBe(indexingStatus.type);
        expect(updatedIndex.blockNumber).toEqual(1000);
        expect(updatedIndex.blockchain).toBe(indexingStatus.blockchain);
      });
    });
  });