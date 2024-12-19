# INSTALLATION: Software & Development environment

###### Instructor : NJ Namju Lee / nj.namju@gmail.com  
###### * Lab - https://namjulee.github.io/njs-lab-public/nj-namju-lee
###### * Linkedin - https://www.linkedin.com/in/nj-namju-lee-926b3252/    * Git - https://github.com/NamjuLee  
###### * Video(English) - https://www.youtube.com/c/njnamjulee            * Writing(English) - https://medium.com/@nj-namju  
###### * Video(Korean) - https://www.youtube.com/c/CodeforDesign          * Writing(Korean) - https://brunch.co.kr/@njnamju  
-----

# 1. DESIGN SOFTWARE

* Rhino 8 - https://www.rhino3d.com/download/
    * numerical utilities https://www.food4rhino.com/en/browse?searchText=designju
    * food4Rhino https://www.food4rhino.com/en

* SketchUp - https://www.sketchup.com/

* 3ds max, Maya, Revit - https://www.autodesk.com/education/edu-software/overview 
    * VRay ...

* Adobe: Aftereffect, Photoshop - https://www.adobe.com/products
* Design Visualization Reference: https://namjulee.github.io/3d-visualization-harvard-gsd.github.com/

---
# 2. IDE & Git
* Git - https://git-scm.com/downloads
* Giuhub desktop - https://desktop.github.com/download/
* Visual Studio Code - https://code.visualstudio.com/
* Visual Studio Community 2022 - https://visualstudio.microsoft.com/vs/community/
* Docker - https://www.docker.com/products/docker-desktop/

---
# 3. Node env
* NodeJS - https://nodejs.org/en/download/prebuilt-installer

```shell
node -v
npm -v
npm install -g yarn
```
* njscore package - https://www.npmjs.com/package/njscore
```shell
npm i njscore 
```
```shell
yarn add njscore
```
* Packages
    * HTMLCanvas
    * D3
    * THREE
    * TensorflowJS
    * webgpu
    * ...


* nvm - https://github.com/coreybutler/nvm-windows/releases
```shell 
nvm install 18 
nvm ls
nvm use 18
```
---
# 4. CUDA for Windows
    • nvidia-smi
    • https://developer.nvidia.com/cuda-toolkit-archive

---
# 5. Miniconda env
    • Miniconda - https://docs.anaconda.com/miniconda/
    • Repo - https://repo.anaconda.com/miniconda/
    • Edit the system environment variables - 
        ○ C:\Users\namju\miniconda3
        ○ C:\Users\namju\miniconda3\Scripts
        ○ C:\Users\namju\miniconda3\condabin

    • conda create -n myEnv python=3.9
    • conda remove --name myEnv --all
    • conda activate myEnv


---
# 6. Python Packages


### Tensorflow
* https://www.tensorflow.org/install/
  * Tensorflow for Windows
https://docs.anaconda.com/working-with-conda/applications/tensorflow/

Case 1
```shell
conda create -n tf-gpu-2024 python=3.8
conda activate tf-gpu-2024
nvidia-smi
conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1
conda install tensorflow-gpu OR
pip install tensorflow-gpu==2.5.0
```

Case 2
```shell
conda create -n tf-gpu-2024 python=3.8
conda activate tf-gpu-2024
conda install -c conda-forge tensorflow-gpu=2.6.0 cudnn=8.2 cudatoolkit=11.2
conda install numpy=1.21
```

* For OSX
  * https://developer.apple.com/metal/tensorflow-plugin/

  * https://medium.com/mlearning-ai/install-tensorflow-on-mac-m1-m2-with-gpu-support-c404c6cfb580

```shell
// M2 TF
conda create -n tf-metal-2024 
conda activate tf-metal-2024 

conda install -c apple tensorflow-deps

pip install tensorflow-macos
pip install tensorflow-metal

pip install numpy --upgrade
pip install pandas --upgrade
pip install matplotlib --upgrade
pip install scikit-learn --upgrade
pip install scipy --upgrade
pip install plotly --upgrade

Opencv m1
https://www.geeksforgeeks.org/how-to-install-opencv-4-on-macos/

conda install -c anaconda seaborn
```

* Testing
```python
Import tensorflow as tf
print("TensorFlow version:", tf.__version__)
print("Is GPU available:", tf.config.list_physical_devices('GPU'))
TensorFlow version: 2.5.0 Is GPU available: [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```


### Pytorch
* Pytorch - https://pytorch.org/get-started/locally/
  * https://pytorch.org/get-started/previous-versions/

* For Windows
```shell
conda create -n pytorch-gpu-2024 python=3.10
conda activate pytorch-gpu-2024


conda install pytorch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0  pytorch-cuda=11.8 -c pytorch -c nvidia
```



* For OSX
  * https://towardsdatascience.com/installing-pytorch-on-apple-m1-chip-with-gpu-acceleration-3351dc44d67c
  
```shell
// M2 Torch
$ conda create -n torch-2023 python=3.9
$ conda activate torch

conda install pytorch torchvision torchaudio -c pytorch-nightly
```


* Testing
```python
import torch
print(torch.__version__)
print(torch.cuda.is_available())

2.5.0 
True
```


### Common Libs
```shell
conda install -c anaconda pillow
conda install -c anaconda pandas
conda install -c anaconda seaborn

conda install -c anaconda matplotlib
conda install -c conda-forge matplotlib
pip install matplotlib

conda install -c anaconda opencv
conda install -c conda-forge opencv
pip install opencv-python

conda install -c anaconda scikit-learn
conda install -c conda-forge scikit-image
pip install tqdm
```

* Only for TF
```shell
conda install keras=2.6  // for tf 2.6.0
conda install -c anaconda tensorflowjs
conda install -c conda-forge tensorflowjs
pip install tensorflowjs
```

* ML lab: https://namjulee.github.io/njs-lab-public/lab/ai-&-ml-for-designers/ai-for-design


---
## 6. Starter
* Starter lab: https://namjulee.github.io/njs-lab-public/lab/cad-app-starter-index/cad-app-starter
