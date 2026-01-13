### Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

Graceful Shutdown とは，サーバーを終了する前に各リソースの適切な開放やデータの永続化等を行ってからサーバーを終了するようなシャットダウンのことである。

KubernetesやAmazon ECSなどのクラウド環境では、Stop命令としてコンテナ停止を指示する際に、まず`SIGTERM`シグナルをコンテナ内の親プロセスに対して送信する。
このシグナルを受け取ったプロセスは、Graceful Shutdownの処理を開始し、必要なクリーンアップ処理を行う時間が与えられる。
その猶予時間はKubernetes, Amazon ECSどちらもデフォルトで30秒に設定されている。([参考1](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#:~:text=Note%3A,by%20force.), [参考2](https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/#:~:text=%E3%82%BF%E3%82%B9%E3%82%AF%E3%81%8C%E5%81%9C%E6%AD%A2%E3%81%99%E3%82%8B%E3%81%A8,%E5%81%9C%E6%AD%A2%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%80%82))
各コンテナでは、この猶予期間内に終了処理を完了し、プロセスを正常に終了させることが推奨されているが、もし猶予期間内に終了処理が完了しない場合は、`SIGKILL`シグナルが送信され、強制的にプロセスが終了される。
