import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgUpdateParams } from "./tx";
/** Msg defines the consensus Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a governance operation for updating the x/consensus module parameters.
   * The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto", memo?: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
  }
  /* UpdateParams defines a governance operation for updating the x/consensus module parameters.
   The authority is defined in the keeper.
  
   Since: cosmos-sdk 0.47 */
  updateParams = async (signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> => {
    const data = [{
      typeUrl: MsgUpdateParams.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  };
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};