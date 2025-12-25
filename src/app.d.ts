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

    type AssetComplianceStatus =
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
        complianceStatus: AssetComplianceStatus;

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
        complianceStatus: AssetComplianceStatus;
        osVersion?: string | null;
        eosDate?: string | null;
        purchaseYear?: number | null;
        price?: number | null;
    }
}
