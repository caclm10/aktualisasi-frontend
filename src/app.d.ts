export {};

declare global {
    interface User {
        id: number;
        name: string;
        email: string;
    }

    interface Office {
        id: string;
        name: string;
        picName: string;
        picContact: string;
        rooms?: Room[];
    }

    interface Room {
        id: string;
        name: string;
        floor: string;
        code: string;
        officeId: string;
        office?: Office;
    }

    type AssetCondition = "baik" | "rusak" | "rusak berat";

    type AssetDeploymentStatus = "in stock" | "deployed" | "maintenance";

    type AssetBaseline =
        | "sesuai"
        | "tidak sesuai"
        | "pengecualian"
        | "belum dicek";

    interface Asset {
        id: string;
        roomId: string;

        registerCode: string;
        serialNumber: string;
        hostname: string;
        brand: string;
        model: string;

        condition: AssetCondition;
        deploymentStatus: AssetDeploymentStatus;

        ipVlan: string | null;
        vlan: string | null;
        portAcsVlan: string | null;
        portTrunk: string | null;
        portCapacity: string | null;
        baseline: AssetBaseline;

        osVersion: string | null;

        eosDate: string | null;
        purchaseYear: number | null;

        imageUrl: string | null;
        price: number | null;

        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;

        room?: Room;
    }

    interface AssetInput {
        room: string;
        registerCode: string;
        serialNumber: string;
        hostname: string;
        brand: string;
        model: string;
        condition: AssetCondition;
        ipVlan?: string | null;
        vlan?: string | null;
        portAcsVlan?: string | null;
        portTrunk?: string | null;
        portCapacity?: string | null;
        baseline: AssetBaseline;
        osVersion?: string | null;
        eosDate?: string | null;
        purchaseYear?: number | null;
        price?: number | null;
    }

    type ActivityCategory = "perjalanan" | "pemeliharaan";

    // Definisi Tipe untuk Properties (JSON Column)
    // Karena isinya dinamis (bisa data mutasi, bisa data update OS),
    // kita gunakan Record<string, any> atau interface yang fleksibel.
    interface ActivityProperties {
        [key: string]: any;
        // Contoh key yang mungkin ada:
        // old_version?: string;
        // new_version?: string;
        // origin_room?: string;
        // related_asset_id?: string;
    }

    interface Activity {
        id: string; // NanoID

        // Foreign Keys (camelCase)
        userId: string;
        assetId: string;
        roomId: string;

        category: ActivityCategory;

        property: string;
        old: string;
        new: string;

        remarks: string | null;

        performedAt: string;

        // Timestamps
        createdAt: string;
        updatedAt: string;

        // RELASI (Optional / Eager Loaded)
        user?: User;

        asset?: Asset;

        room?: Room;
    }
}
