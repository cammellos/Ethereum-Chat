import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeModules } from "react-native";

var EthereumChatAccountModule = NativeModules.EthereumChatAccountModule;

const nodeConfig = {"ClusterConfig":{"Enabled":true,"Fleet":"eth.staging","BootNodes":["enode:\/\/f79fb3919f72ca560ad0434dcc387abfe41e0666201ebdada8ede0462454a13deb05cda15f287d2c4bd85da81f0eb25d0a486bbbc8df427b971ac51533bd00fe@174.138.107.239:443","enode:\/\/10a78c17929a7019ef4aa2249d7302f76ae8a06f40b2dc88b7b31ebff4a623fbb44b4a627acba296c1ced3775d91fbe18463c15097a6a36fdb2c804ff3fc5b35@35.238.97.234:443","enode:\/\/630b0342ca4e9552f50714b6c8e28d6955bc0fd14e7950f93bc3b2b8cc8c1f3b6d103df66f51a13d773b5db0f130661fb5c7b8fa21c48890c64c79b41a56a490@47.91.229.44:443"],"TrustedMailServers":["enode:\/\/e4fc10c1f65c8aed83ac26bc1bfb21a45cc1a8550a58077c8d2de2a0e0cd18e40fd40f7e6f7d02dc6cd06982b014ce88d6e468725ffe2c138e958788d0002a7f@35.239.193.41:443","enode:\/\/b74859176c9751d314aeeffc26ec9f866a412752e7ddec91b19018a18e7cca8d637cfe2cedcb972f8eb64d816fbd5b4e89c7e8c7fd7df8a1329fa43db80b0bfe@47.52.90.156:443","enode:\/\/69f72baa7f1722d111a8c9c68c39a31430e9d567695f6108f31ccb6cd8f0adff4991e7fdca8fa770e75bc8a511a87d24690cbc80e008175f40c157d6f6788d48@206.189.240.16:443"],"StaticNodes":["enode:\/\/914c0b30f27bab30c1dfd31dad7652a46fda9370542aee1b062498b1345ee0913614b8b9e3e84622e84a7203c5858ae1d9819f63aece13ee668e4f6668063989@167.99.19.148:443","enode:\/\/2d897c6e846949f9dcf10279f00e9b8325c18fe7fa52d658520ad7be9607c83008b42b06aefd97cfe1fdab571f33a2a9383ff97c5909ed51f63300834913237e@35.192.0.86:443"],"RendezvousNodes":["\/ip4\/35.238.97.234\/tcp\/30703\/ethv4\/16Uiu2HAm6G9sDMkrB4Xa5EH3Zx2dysCxFgBTSRzghic3Z9tRFRNE","\/ip4\/174.138.107.239\/tcp\/30703\/ethv4\/16Uiu2HAm8UZXUHEPZrpJbcQ3yVFH6UtKrwsG6jH4ai72PsbLfVFb","\/ip4\/47.91.229.44\/tcp\/30703\/ethv4\/16Uiu2HAmRnt2Eyoknh3auxh4fJwkRgqkH1gqrWGes8Pk1k3MV4xu"]},"DataDir":"\/ethereum\/mainnet_rpc_dev","LogLevel":"DEBUG","Rendezvous":true,"WhisperConfig":{"Enabled":true,"BloomFilterMode":null,"LightClient":true,"MinimumPoW":0.001},"LogEnabled":true,"BrowsersConfig":{"Enabled":true},"MailserversConfig":{"Enabled":true},"RequireTopics":{"whisper":{"Min":2,"Max":2}},"UpstreamConfig":{"Enabled":true,"URL":"https:\/\/mainnet.infura.io\/v3\/f315575765b14720b32382a61a89341a"},"ListenAddr":":30304","PermissionsConfig":{"Enabled":true},"NetworkId":1,"Name":"StatusIM","EnableNTPSync":true,"NoDiscovery":false,"ShhextConfig":{"VerifyENSURL":"https:\/\/mainnet.infura.io\/v3\/f315575765b14720b32382a61a89341a","VerifyTransactionChainID":1,"BackupDisabledDataDir":"\/..\/no_backup","InstallationID":"9463b2d5-780b-55b7-82f6-d7e4364c8193","DataSyncEnabled":true,"PFSEnabled":true,"MailServerConfirmations":true,"MaxMessageDeliveryAttempts":6,"VerifyTransactionURL":"https:\/\/mainnet.infura.io\/v3\/f315575765b14720b32382a61a89341a","VerifyENSContractAddress":"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},"WalletConfig":{"Enabled":true},"StatusAccountsConfig":{"Enabled":true},"KeyStoreDir":"\/keystore","LogDir":"\/storage\/emulated\/0\/Android\/data\/im.status.ethereum.debug\/files\/Download","LogFile":"geth.log"}  

export default class App extends Component {
  state = {
    account: {}
  };

  componentDidMount() {
    EthereumChatAccountModule.createAccount(
      err => console.log(err),
      account => {
        account = JSON.parse(account);
        const accountsArr = account.accounts;
        const newAccount = accountsArr[0];

        const accountObject = {
          address: newAccount.address,
          wallet: false,
          chat: true,
          type: "",
          storage: "",
          path: "",
          "public-key": newAccount.pubkey,
          name: "Rohan Keskar",
          color: "#fff"
        };
        const accountToSave = [accountObject];

        console.log(accountObject);
        console.log(nodeConfig)
        EthereumChatAccountModule.saveAccountAndLogin(
          JSON.stringify(accountObject),
          "password",
          JSON.stringify(nodeConfig),
          "[]"
        );
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, My name is:</Text>
        <Text>Rohan Keskar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
