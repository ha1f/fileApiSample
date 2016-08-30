
function onDirectorySelected(files) {

    var filepaths = [];
    var uniqFoldernames = [];
    Array.from(files).forEach(function(file, index, array) {
        if (file.name != ".") {
            // 画像のみ
            if (!file.type.match(/image.*/g)) {
                return;
            }

            // フォルダ名を取得
            var paths = file.webkitRelativePath.split("/");
            var pathLength = paths.length;
            var foldername;
            if (pathLength > 0) {
                foldername = paths[pathLength - 2];
            } else {
                foldername = "";
            }

            // folderごとにdiv要素を作成
            if (uniqFoldernames.indexOf(foldername) < 0) {
                uniqFoldernames.push(foldername);
                // コンテナ
                var folderBox = document.createElement('div');
                folderBox.classList.add('folder-box');

                // フォルダ名のラベル
                var foldernameLabel = document.createElement('div');
                foldernameLabel.innerHTML = foldername;
                foldernameLabel.classList.add('foldername-label');
                folderBox.appendChild(foldernameLabel);

                // フォルダ内の画像一覧を表示するdiv要素
                var folderImagesList = document.createElement('div');
                folderImagesList.id = "images-list-" + foldername;
                folderImagesList.classList.add('folder-images-list');
                folderBox.appendChild(folderImagesList);

                document.getElementById("images-list").appendChild(folderBox);
            }

            var reader = new FileReader();
            reader.onload = function(e) {
                // コンテナ
                var imgbox = document.createElement('div');
                imgbox.classList.add('img-box');

                // 画像
                var img = document.createElement('img');
                img.src = e.target.result;
                imgbox.appendChild(img);

                // ファイル名のラベル
                var filenameLabel = document.createElement('div');
                filenameLabel.classList.add('filename-label');
                filenameLabel.innerHTML = file.name;
                imgbox.appendChild(filenameLabel);

                var sizeLabel = document.createElement('div');
                sizeLabel.classList.add('information-label');
                imgbox.appendChild(sizeLabel);

                document.getElementById("images-list-" + foldername).appendChild(imgbox);

                // 直後だと画像サイズ読み取れない場合あり
                setTimeout(function() {
                    sizeLabel.innerHTML = String(img.naturalWidth) + " px * " + String(img.naturalHeight) + "px";
                }, 5);
            };
            reader.readAsDataURL(file);
        }

        filepaths.push(file.webkitRelativePath);
    });
}
