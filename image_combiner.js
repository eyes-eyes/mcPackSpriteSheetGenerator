self.onmessage = function handleMessageFromMain(msg) {

    const bufTransferredFromMain = msg.data;
    console.log(bufTransferredFromMain)

}