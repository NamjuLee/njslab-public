
# INSTALLATION

#### Instructor : NJ Namju Lee / nj.namju@gmail.com  

###### * Lab - https://namjulee.github.io/njs-lab-public/nj-namju-lee

###### * Linkedin - https://www.linkedin.com/in/nj-namju-lee-926b3252/    * Git - https://github.com/NamjuLee  


###### * Video(English) - https://www.youtube.com/c/njnamjulee            * Writing(English) - https://medium.com/@nj-namju  

###### * Video(Korean) - https://www.youtube.com/c/CodeforDesign          * Writing(Korean) - https://brunch.co.kr/@njnamju  

## DESIGN SOFTWARE

Rhino 8 - https://www.rhino3d.com/download/
* numerical utilities https://www.food4rhino.com/en/browse?searchText=designju
* food4Rhino https://www.food4rhino.com/en

SketchUp - https://www.sketchup.com/

3ds max, Maya, Revit - https://www.autodesk.com/education/edu-software/overview 
* VRay ...

Adobe: Aftereffect, Photoshop - https://www.adobe.com/products


## IDE & Git
* Git - https://git-scm.com/downloads
* Giuhub desktop - https://desktop.github.com/download/
* Visual Studio Code - https://code.visualstudio.com/
* Visual Studio Community 2022 - https://visualstudio.microsoft.com/vs/community/
* Docker - https://www.docker.com/products/docker-desktop/


## Node env
NodeJS - https://nodejs.org/en/download/prebuilt-installer
    • node -v
    • npm -v
    • npm install -g yarn
nvm - https://github.com/coreybutler/nvm-windows/releases
    • nvm install 18 
    • nvm ls
    • nvm use 18


## CUDA for Windows
    • nvidia-smi
    • https://developer.nvidia.com/cuda-toolkit-archive

## Miniconda env
    • Miniconda - https://docs.anaconda.com/miniconda/
    • Repo - https://repo.anaconda.com/miniconda/
    • Edit the system environment variables - 
        ○ C:\Users\namju\miniconda3
        ○ C:\Users\namju\miniconda3\Scripts
        ○ C:\Users\namju\miniconda3\condabin

    • conda create -n myEnv python=3.9
    • conda remove --name myEnv --all
    • conda activate myEnv



# Python Packages
## Tensorflow - https://www.tensorflow.org/install/

Tensorflow for Windows
https://docs.anaconda.com/working-with-conda/applications/tensorflow/

Case 1
```
conda create -n tf-gpu-2024 python=3.8
conda activate tf-gpu-2024
nvidia-smi
conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1
conda install tensorflow-gpu OR
pip install tensorflow-gpu==2.5.0
```

Case 2
```
conda create -n tf-gpu-2024 python=3.8
conda activate tf-gpu-2024
conda install -c conda-forge tensorflow-gpu=2.6.0 cudnn=8.2 cudatoolkit=11.2
conda install numpy=1.21
```
---
For Mac

https://developer.apple.com/metal/tensorflow-plugin/

https://medium.com/mlearning-ai/install-tensorflow-on-mac-m1-m2-with-gpu-support-c404c6cfb580

```
M2 TF
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



Testing
```
Import tensorflow as tf
print("TensorFlow version:", tf.__version__)
print("Is GPU available:", tf.config.list_physical_devices('GPU'))
TensorFlow version: 2.5.0 Is GPU available: [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```


## Pytorch
Pytorch - https://pytorch.org/get-started/locally/

For Windows
```
conda create -n pytorch-gpu-2024 python=3.10
conda activate pytorch-gpu-2024


conda install pytorch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0  pytorch-cuda=11.8 -c pytorch -c nvidia
```
https://pytorch.org/get-started/previous-versions/

---
For Mac
```
M2 Torch
$ conda create -n torch-2023 python=3.9
$ conda activate torch

conda install pytorch torchvision torchaudio -c pytorch-nightly
```
https://towardsdatascience.com/installing-pytorch-on-apple-m1-chip-with-gpu-acceleration-3351dc44d67c


Testing
```
import torch
print(torch.__version__)
print(torch.cuda.is_available())

2.5.0 
True
```


## Common Libs
```
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

```
conda install keras=2.6  // for tf 2.6.0
conda install -c anaconda tensorflowjs
conda install -c conda-forge tensorflowjs
pip install tensorflowjs
```